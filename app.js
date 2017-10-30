// write your code here!

const form = d3.select('form');
const reset = d3.select('#reset');
const input = d3.select('input');

form.on('submit', function() {
  d3.event.preventDefault();
  let text = input.property('value');

  let letters = d3.select('#letters')
                    .selectAll('.letter')
                    .data(getFrequencies(text), (d) => d.character);

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

