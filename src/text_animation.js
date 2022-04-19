const text_split = (node, returnText, span) => {
  const nodeClass = node.className;
  const text = node.textContent.replace(/¥?¥n/g, '');
  const splitText = text.split('');
  const removals = [' '];
  const splitTexts = splitText.filter((v) => {
    return ! removals.includes(v);
  });

  splitTexts.forEach((char) => {
    span === true ? 
    returnText += `<span class=${nodeClass}>${char}</span>` : returnText += `<span>${char}</span>`;
  });

  return returnText;
}

const change_span = (target) => {
  const nodes = [...target.childNodes];
  let returnText = '';

  nodes.forEach((node) => {
    node.nodeType == 3 ? 
    returnText = text_split(node, returnText, false) : node.outerHTML.indexOf('span') != -1 ? 
    returnText = text_split(node, returnText, true) : returnText += node.outerHTML;
  });

  return returnText;
}

const text_animation = (selector, tl, stag) => {
  const selectors = [...document.querySelectorAll(selector)];

  selectors.forEach((variable) => {
    variable.innerHTML = change_span(variable);
    variable.spans = variable.querySelectorAll('span');

    tl.from(variable, {
      opacity: 0
    })
    .from(variable.spans, {
      opacity: 0,
      duration: 0.01,
      stagger: stag
    });
  });
}

export {text_animation};