(function () {
  var carousel = document.querySelector(".product-carousel");
  if (!carousel) return;

  var grid = carousel.querySelector(".product-grid");
  var previousButton = carousel.querySelector(".product-carousel-previous");
  var nextButton = carousel.querySelector(".product-carousel-next");
  var tolerance = 2;

  function updateButtons() {
    var maxScrollLeft = grid.scrollWidth - grid.clientWidth;
    var canScroll = maxScrollLeft > tolerance;

    previousButton.hidden = !canScroll || grid.scrollLeft <= tolerance;
    nextButton.hidden = !canScroll || grid.scrollLeft >= maxScrollLeft - tolerance;
  }

  function scrollByCard(direction) {
    var card = grid.querySelector(".product-card");
    if (!card) return;

    var styles = window.getComputedStyle(grid);
    var gap = parseFloat(styles.columnGap) || 0;
    grid.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth"
    });
  }

  previousButton.addEventListener("click", function () {
    scrollByCard(-1);
  });

  nextButton.addEventListener("click", function () {
    scrollByCard(1);
  });

  grid.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
})();
