

const change_span = (target) => {
  const nodes = [...target.childNodes];
  let returnText = '';

  for (const node of nodes) {
    if (node.nodeType == 3) {
      const text = node.textContent.replace(/¥?¥n/g, '');
      const splitText = text.split('');
      var removals = [' '];
      var splitTexts = splitText.filter((v) => {
        return ! removals.includes(v);
      });

      for(const char of splitTexts) {
        returnText += `<span>${char}</span>`;
      }
    } else {
      if (node.outerHTML.indexOf("span") != -1) {
        var nodeClass = node.className;
        const text = node.textContent.replace(/¥?¥n/g, '');
        const splitText = text.split('');
        var removals = [' '];
        var splitTexts = splitText.filter((v) => {
          return ! removals.includes(v);
        });

        for (const char of splitTexts) {
          returnText += `<span class=${nodeClass}>${char}</span>`;
        }
      } else {
        returnText += node.outerHTML;
      }
    }
  }
  return returnText;
}

function text_animation(selector, tl, stag) {
  var selectors = [...document.querySelectorAll(selector)];
  for (let variable of selectors) {
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
  }
}

export {text_animation};