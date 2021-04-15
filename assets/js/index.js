(function () {

  const products = {
    products: [],

    URL: 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
  };





  /**
   * shorthand to get DOM elements
   * 
   * @example 
   *   $('body'); // <body></body>
   * 
   * @param   {String} el Required
   * @returns {Object}
   */

  function $ (el) {
    return document.querySelector.bind(document)(el);
  }









  /**
   * allows user to hide the text inside .personal__paragraph element
   */
  function togglePersonalText () {
    $('.personal').classList.toggle('open');
  }








  /**
  * 
  * performs an external product search  
  * 
  */
  async function fetchProductsAPI () {
    const data = await (await fetch(products.URL)).json();

    [products.products, products.URL] = [data.products, `https://${data.nextPage}`];

    renderProducts(); // after getting data, start rendering
  }






  function renderProducts () {
    const DOMProductsStructure = [...document.querySelectorAll('.products__item')];

    for (let index = 0, len = DOMProductsStructure.length; index < len; index++) {
      fillTree(DOMProductsStructure[index], index);
    }
  }








  /**
   * 
   * fill DOM with data that came from API 
   * 
   * @param {Object} tree  Required
   * @param {Number} index Required
   * 
   */
  function fillTree (tree, index) {
    const {
      name,
      image,
      price,
      oldPrice,
      description,
      installments: {
        count, value
      }
    } = products.products[index];

    // set image address
    tree.querySelector('img').setAttribute('src', `https:${image}`);

    const productInfo = [
      [ '.products__name', name ],
      [ '.products__newprice', valueFormat(price) ],
      [ '.products__oldprice', valueFormat(oldPrice) ],
      [ '.products__description', description ],
      [ '.products__plots', `ou ${count}x de ${valueFormat(value)}` ]
    ];

    productInfo.forEach( ([ selector, value ]) => {
      tree.querySelector(selector).textContent = value;
    });
  }







  /**
   * 
   * format the value using the Brazilian currency
   * 
   * @example
   *    valueFormat(27); // R$ 27,00
   * 
   * @param   {Number|String} v Required
   * @returns {String}          formatted value
   * 
   */
  function valueFormat (v) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' } ).format(v);
  }






  document.addEventListener('DOMContentLoaded', e => {
    $('.personal__title').addEventListener('click', togglePersonalText);

    $('form[name="personal__form"]').addEventListener('submit', e => {
      // prevent default form behavior
      e.preventDefault();
    });

    [...document.querySelectorAll('.products__moreitems')].forEach(button => {
      // fetch with new products every time
      button.addEventListener('click', fetchProductsAPI);
    });

    // load products after loading DOM
    fetchProductsAPI();
  });

})();