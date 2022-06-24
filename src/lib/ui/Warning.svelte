<script>
  let height;
</script>

<aside role="alert" class="warning" bind:clientHeight={height}>
  <div class="wrapper middle">
    <strong>
      <slot/>
    </strong>
  </div>
</aside>
<div class="spacer" style:height="{height ? height: 40}px"/>

<style>
  .warning {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    color: white;
    background-color: #bb3333;
    margin-bottom: 10px;
    padding: 8px 0;
    font-size: 1em;
  }
  .spacer {
    display: block;
  }
</style>
