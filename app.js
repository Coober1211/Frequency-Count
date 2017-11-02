// write your code here!

const form = d3.select('form');
const reset = d3.select('#reset');
const input = d3.select('input');

form.on('submit', function() {
  d3.event.preventDefault();
  let text = input.property('value');
  const freq = getFrequencies(text);

  let letters = d3.select('#letters')
                    .selectAll('.letter')
                    .data(freq, (d) => d.character);

  letters
      .classed('new', false)
    .exit()
    .remove();
  
  letters
    .enter()
    .append('div')
      .classed('letter', true)
      .classed('new', true)
    .merge(letters)
      .text(d => d.character)
      .style('width', '20px')
      .style('line-height', '20px')
      .style('margin-right', '5px')
      .style('height', d => `${d.count * 20}px`)

  d3.select('#phrase')
    .text(`Analysis of: ${input.property('value')}`);
  
  d3.select('#count')
    .text(`There are ${letters.enter().nodes().length} new character`);

  input.property('value', '');

  // Use svg to do it!
  const width = 400;
  const height = 200;
  const barPadding = 10;
  const barNum = freq.length
  const barWidth = width / barNum - barPadding;  

  let svg = d3.select('svg')
              .attr('width', width)
              .attr('height', height)
              .selectAll('g')
              .data(freq, (d) => d.character)

  svg
      .classed('new-letter', false)
    .exit()
    .remove()

  const svgBar = svg
                  .enter()
                    .append('g')
                      .classed('svg-letter', true)
                      .classed('new-letter', true)
  
  svgBar.append('rect')
  svgBar.append('text')

  svgBar
    .merge(svg)
      .select('rect')
        .attr('width', barWidth)
        .attr('height', d => d.count * 50)
        .attr('x', (d, i) => i * (barWidth + barPadding))
        .attr('y', d => height - d.count * 50)
        .text(d => d.character)
  
  svgBar
    .merge(svg)
      .select('text')
        .attr('x', (d, i) => (barWidth + barPadding) * i + barWidth / 2)
        .attr('y', d => height - d.count * 50 - 10)
        .text(d => d.character)


})

reset.on('click', function() {
    d3.selectAll('.letter')
      .remove();

    d3.select('#phrase')
      .text('');

    d3.select('#count')
      .text('');
})

function getFrequencies(str) {
  const sorted = str.split('').sort();
  let data = [];
  for (let i = 0; i < sorted.length; i += 1) {
    let last = data[data.length - 1];
    if (last && last.character === sorted[i]) {
      last.count += 1;
    } else {
      data.push({ character: sorted[i], count: 1 });
    }
  }
  return data;
}

