<script>
  export let title = "Banner title";
  export let label = "This is a description of the link";
  export let url = "/";
</script>

<section class="background--pineapple-yellow wrapper banner__bottom-shadow margin-top-sm--3 margin-top-md--3 margin-top-lg--3 margin-bottom--3 js-hover-click" style="position: relative;">
  <div class="col-wrap">
    <a href="{url}">
      <div class="col">
        <h1 class="banner__heading margin-top--1 font-weight-700 font-size--h2 adjust-font-size--30">
          {title}
        </h1>
        <p class="underline-link banner__link banner__body margin-top--0 margin-bottom--1">
          {label}
        </p>
      </div>
      <span class="box__clickable"></span>
    </a>
  </div>
</section>