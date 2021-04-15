(function () {

  const products = {
    products: [],

    DOMList: $('.products__list'),

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
   * 
   * generates an interval between executing functions
   * 
   * @param {Number} ms Required
   * @returns {Promise}
   * 
   */
  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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





  /**
   * after getting data, populate the DOM with them
   */
  async function renderProducts () {
    for (let index = 0, len = products.products.length; index < len; index++) {
      await sleep(200).then(() => {
        fillTree(products.products[index]);
      });
    }
  }








  /**
   * 
   * fill DOM with data that came from API 
   * 
   * @param {Object} product Required
   * 
   */
  function fillTree (product) {
    const {
      id,
      name,
      image,
      price,
      oldPrice,
      description,
      installments: {
        count, value
      }
    } = product;

    products.DOMList.insertAdjacentHTML("beforeend", `
      <div class="products__item bounce_in product-${id}">
        <div class="products__logo">
          <img src="https:${image}" alt="product logo" />
        </div>

        <div class="products__info">
          <p class="products__name">${name}</p>
          <p class="products__description hide-mobile">
            ${description}
          </p>
          <p class="products__oldprice">De: ${valueFormat(oldPrice)}</p>
          <p class="products__newprice">Por: ${valueFormat(price)}</p>
          <p class="products__plots">ou ${count}x de ${valueFormat(value)}</p>

          <button class="products__buybutton">Comprar</button>
        </div>
      </div>
    `);
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

    [...document.querySelectorAll('form')].forEach(form => {
      // prevent default form behavior
      form.addEventListener('submit', e => e.preventDefault());
    });

    [...document.querySelectorAll('.products__moreitems')].forEach(button => {
      // fetch with new products every time
      button.addEventListener('click', fetchProductsAPI);
    });

    // load products after loading DOM
    fetchProductsAPI();
  });

})();