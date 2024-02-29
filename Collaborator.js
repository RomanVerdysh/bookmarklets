javascript:(()=>{
  document.querySelectorAll('.catalog-grid-row').forEach((row, index) => {
    let result;
    const newDiv = document.createElement('div');
    newDiv.className = 'catalog-grid-column RomanusCol';

    if (index === 0) {
      result = "Score";
      newDiv.textContent = result;
      row.appendChild(newDiv);
    } else {
      const getTextContent = (selector) => {
        const element = row.querySelector(selector);
        if (!element) return '0';
        let text = element.innerHTML.trim();
        let multiplier = 1;
        text = text.replace("&nbsp;", " ");
        if (text.includes(" k")) {
          multiplier = 1000;
        } else if (text.includes(" M")) {
          multiplier = 1000000;
        }
        text = text.replace(' EUR', '').replace(',', '.').replace(' ', '');
        return (parseFloat(text) * multiplier);
      };

      const dr = parseFloat(getTextContent('div:nth-child(4) > span'));
      const search_traffic = parseFloat(getTextContent('div:nth-child(6) > span'));
      const ur = parseFloat(getTextContent('div:nth-child(8) > span'));
      const outgoing_domains = parseFloat(getTextContent('div:nth-child(9) > span'));
      const tf = parseFloat(getTextContent('div:nth-child(10) > span'));
      const cf = parseFloat(getTextContent('div:nth-child(11) > span'));
      const gooindex = parseFloat(getTextContent('div:nth-child(12) > span'));
      let anons = getTextContent('span.anons-placement-note.cursor-pointer.d-inline-flex.mt-1');
      anons = (anons === "Free announcement on the main page") ? 0 : 1;
      const up = getTextContent('i.fas.fa-caret-up.grown-up') ? 0 : 1;
      const priceText = getTextContent('.creator-price__publication-value');
      const price = parseFloat(priceText);

      result = isNaN(price) ? 'N/A' : Math.round((Math.log(dr) + Math.log(ur) + Math.log(search_traffic) + Math.log(gooindex/outgoing_domains) + Math.log(tf) + Math.log(cf) + up + anons) / Math.log(price) * 10) / 10;
      newDiv.textContent = result.toString();
      row.appendChild(newDiv);
    }
  });
})();
