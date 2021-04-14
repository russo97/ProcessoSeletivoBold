(function () {

  /**
   * shorthand to get DOM elements
   * 
   * @example 
   *   $('body'); // <body></body>
   * 
   * @param   {String} el   Parametro obrigatório
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

  document.addEventListener('DOMContentLoaded', e => {
    $('.personal__title').addEventListener('click', togglePersonalText);

    $('form[name="personal__form"]').addEventListener('submit', e => {
      e.preventDefault();
    });
  });

})();