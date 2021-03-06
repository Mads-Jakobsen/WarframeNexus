<template>
  <div class="doubleline">
    <svg />
  </div>
</template>

<script>
import * as d3 from 'd3'
import utility from 'src/components/wow-classic/utility.js'

export default {
  props: ['data', 'opts'],
  data () {
    return {
      svg: '',
      tooltip: '',
      chart: '',
      bisect: null,
      padding: {
        top: 20,
        bottom: 20 + 16,
        left: 25,
        right: 25
      },
      breakpointSmall: 640
    }
  },

  computed: {
    options () {
      const defaultOptions = {
        secondaryLabel: '',
        secondaryScale: true,
        parsePrice: { primary: true, secondary: false },
        areaChart: { primary: false, secondary: true }
      }
      return { ...defaultOptions, ...this.opts }
    }
  },

  watch: {
    data (newData, oldData) {
      this.onResize(false)
    }
  },

  mounted () {
    this.svg = d3.select(this.$el).select('svg')
    this.tooltip = d3.select(this.$el).append('div')
      .attr('class', 'tooltip')
      .style('display', 'none')
    this.tooltip.append('div').attr('class', 'tooltip-date')
    this.tooltip.append('div').attr('class', 'tooltip-value')
    this.tooltip.append('div').attr('class', 'tooltip-value tooltip-value-2')
    this.bisect = d3.bisector(d => d.x.getTime()).left

    window.addEventListener('resize', this.onResize)
    this.createChart()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize (delay = true) {
      // Timeout because certain actions like maximize trigger the resize event before actually maximizing
      setTimeout(() => {
        this.svg.selectAll('*').remove()
        this.createChart()
      }, delay ? 100 : 0)
    },
    createChart () {
      const options = this.options
      const data = this.data
      const tooltip = this.tooltip
      const bisect = this.bisect
      const padding = { ...this.padding }
      const smallDevice = window.innerWidth <= this.breakpointSmall

      // Create scales initially here so we can get a dynamic axis
      const yExtents1 = d3.extent(data, d => d.y1)
      const yExtents2 = d3.extent(data, d => d.y2)
      if (!this.options.secondaryScale) { // Correctly scale if sameScale
        if (yExtents2[0] < yExtents1[0]) yExtents1[0] = yExtents2[0]
        if (yExtents2[1] > yExtents1[1]) yExtents1[1] = yExtents2[1]
      }
      const yPadding1 = Math.round((yExtents1[1] - yExtents1[0]) / 6)
      const yScale1Min = this.options.areaChart.primary || yExtents1[0] - yPadding1 < 0 ? 0 : yExtents1[0] - yPadding1
      const yScale1 = d3.scaleLinear()
        .range([200, 0]) // Random height
        .domain([yScale1Min, yExtents1[1] + yPadding1])
      const yPadding2 = Math.round((yExtents2[1] - yExtents2[0]) / 6)
      const yScale2Min = this.options.areaChart.secondary || yExtents2[0] - yPadding2 < 0 ? 0 : yExtents2[0] - yPadding2
      const yScale2 = this.options.secondaryScale ? d3.scaleLinear()
        .range([200, 0])
        .domain([yScale2Min, yExtents2[1] + yPadding2]) : yScale1

      // Create fake axes and calculate needed axis width
      if (!smallDevice) {
        const fakeAxis1 = this.createAxisY1(this.svg, yScale1)
        const fakeAxis2 = this.createAxisY2(this.svg, yScale2, 200)
        padding.left += d3.max(fakeAxis1.selectAll('.tick > text').nodes(), t => t.getBoundingClientRect().width)
        padding.right += this.options.secondaryScale ? d3.max(fakeAxis2.selectAll('.tick > text').nodes(), t => t.getBoundingClientRect().width) : 0
        fakeAxis1.remove()
        fakeAxis2.remove()
      } else {
        padding.left = 10
        padding.right = 10
      }

      // Get dimensions
      const boundingBox = this.svg.node().getBoundingClientRect()
      const height = boundingBox.height - padding.top - padding.bottom
      const width = boundingBox.width - padding.left - padding.right

      // Create chart (needed for custom padding)
      this.chart = this.svg.append('g').attr('transform', `translate(${padding.left}, ${padding.top})`)

      // Set scales to actual range
      yScale1.range([height, 0])
      yScale2.range([height, 0])
      const xScale = d3.scaleTime()
        .range([0, width])
        .domain(d3.extent(data, d => d.x))

      // Create lines
      this.chart.append('path')
        .datum(data)
        .attr('class', `line-2 ${this.options.areaChart.secondary ? 'area-2' : ''}`)
        .attr('fill', this.options.areaChart.secondary ? undefined : 'none')
        .attr('stroke-width', 1.5)
        .attr('d', this.options.areaChart.secondary ? d3.area().x(d => xScale(d.x)).y0(yScale2(yScale2.domain()[0])).y1(d => yScale2(d.y2)) : d3.line().x(d => xScale(d.x)).y(d => yScale2(d.y2)))
      this.chart.append('path')
        .datum(data)
        .attr('class', `line-1 ${this.options.areaChart.primary ? 'area-1' : ''}`)
        .attr('fill', this.options.areaChart.primary ? undefined : 'none')
        .attr('stroke-width', 1.5)
        .attr('d', this.options.areaChart.primary ? d3.area().x(d => xScale(d.x)).y0(yScale1(yScale1.domain()[0])).y1(d => yScale1(d.y1)) : d3.line().x(d => xScale(d.x)).y(d => yScale1(d.y1)))

      // Create axes
      this.createAxisY1(this.chart, yScale1, smallDevice)
      if (this.options.secondaryScale) this.createAxisY2(this.chart, yScale2, width, smallDevice)
      this.chart.append('g') // X axis
        .attr('transform', `translate(0, ${height})`)
        .attr('class', 'axis')
        .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat('%d. %b')).tickSize(4).tickSizeOuter(0))

      // Create tooltip focus point
      const focusBar = this.chart.append('g').style('display', 'none')
      focusBar.append('line')
        .attr('class', 'focus-bar')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', height)
        .attr('fill', 'none')
        .attr('stroke-width', 1)
      const focusValue1 = this.chart.append('g').style('display', 'none')
      focusValue1.append('circle')
        .attr('r', 3)
        .attr('class', 'focus-value-1')
      const focusValue2 = this.chart.append('g').style('display', 'none')
      focusValue2.append('circle')
        .attr('r', 3)
        .attr('class', 'focus-value-2')

      // Create tooltip content
      const tooltipDate = this.tooltip.select('.tooltip-date')
      const tooltipValue1 = this.tooltip.select('.tooltip-value')
      const tooltipValue2 = this.tooltip.select('.tooltip-value-2')

      // Create overlay for tooltip
      this.chart.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover touchstart', () => {
          focusBar.style('display', null)
          focusValue1.style('display', null)
          focusValue2.style('display', null)
          tooltip.style('display', null)
        })
        .on('mouseout touchend', () => {
          focusBar.style('display', 'none')
          focusValue1.style('display', 'none')
          focusValue2.style('display', 'none')
          tooltip.style('display', 'none')
        })
        .on('mousemove', function () {
          const x0 = xScale.invert(d3.mouse(this)[0])
          tooltipMove(x0)
        })
        .on('touchmove', function () {
          const x0 = xScale.invert(d3.touches(this)[0][0])
          tooltipMove(x0)
        })

      const tooltipMove = x0 => {
        const i = bisect(data, x0, 1)
        const d0 = data[i - 1]
        const d1 = i > data.length - 1 ? data[i - 1] : data[i]
        const d = x0 - d0.x > d1.x - x0 ? d1 : d0

        focusBar.attr('transform', `translate(${xScale(d.x)}, 0)`)
        focusValue1.attr('transform', `translate(${xScale(d.x)}, ${yScale1(d.y1)})`)
        focusValue2.attr('transform', `translate(${xScale(d.x)}, ${yScale2(d.y2)})`)
        if (!smallDevice) tooltip.attr('style', `left: ${xScale(d.x) + 96}px; top: ${yScale1(d.y1) - 32}px;`)
        else tooltip.attr('style', `left: ${width / 4}px; top: ${-64}px;`)
        tooltipDate.text(d3.timeFormat('%a %d. %B, %H:%M UTC')(d.x))
        tooltipValue1.text(options.parsePrice.primary ? utility.parsePrice(d.y1) : d.y1)
        tooltipValue2.text(`${options.secondaryLabel}: ${options.parsePrice.secondary ? utility.parsePrice(d.y2) : d.y2}`)
      }
    },
    createAxisY1 (node, yScale, smallDevice = false) {
      const axis = smallDevice ? d3.axisRight(yScale) : d3.axisLeft(yScale)
      return node.append('g') // Y1 left axis
        .attr('class', 'axis')
        .call(axis.tickFormat(this.options.parsePrice.primary ? d => (d / 10000).toFixed(2) + 'g' : undefined).tickSize(3).ticks(5).tickSizeOuter(0))
    },
    createAxisY2 (node, yScale, width, smallDevice = false) {
      const axis = smallDevice ? d3.axisLeft(yScale) : d3.axisRight(yScale)
      return node.append('g') // Y2 left axis
        .attr('transform', `translate(${width}, 0)`)
        .attr('class', 'axis')
        .call(axis.tickFormat(this.options.parsePrice.secondary ? d => (d / 10000).toFixed(2) + 'g' : undefined).tickSize(3).ticks(5).tickSizeOuter(0))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/styles/partials/wow-classic/importer';

.doubleline {
  position: relative;
}
svg {
  width: 100%;
  height: 100%;
}
/deep/ .axis {
  color: $color-font-body;
  font-size: 0.7em;
}
/deep/ .line-1 {
  stroke: $color-primary-subtle;
}
/deep/ .area-1 {
  fill: $color-primary-subtle;
  fill-opacity: 0.45;
}
/deep/ .line-2 {
  stroke: $color-accent-subtle;
}
/deep/ .area-2 {
 fill: $color-accent-subtle;
 fill-opacity: 0.45;
}
/deep/ .overlay {
  fill: none;
  pointer-events: all;
}
/deep/ .tooltip {
  white-space: nowrap;
  z-index: 1;
  padding: 10px 12px;
  position: absolute;
  background-color: $color-bg;
  pointer-events: none;
  transition: all 0.05s;
  @include shadow-1;
  border-radius: 2px;
  font-size: 0.9em;

  .tooltip-date {
    color: $color-font-paragraph;
  }
  .tooltip-value {
    margin-top: 5px;

    span {
      vertical-align: initial;
    }
  }
}
/deep/ .focus-bar {
  stroke: $color-font-body;
}
/deep/ .focus-value-1 {
  fill: $color-primary-subtle;
}
/deep/ .focus-value-2 {
  fill: $color-accent-subtle;
}
</style>
