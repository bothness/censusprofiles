<script>
    export let phase = "Prototype";
    export let url = "//www.ons.gov.uk/feedback";
</script>

<aside class="ons-phase-banner">
    <div class="wrapper">
        <div class="ons-grid">
            <div class="ons-grid__col ons-col-auto ons-u-flex-no-grow ons-u-flex-no-shrink">
                <h3 class="ons-phase-banner__badge">{phase}</h3>
            </div>
            <div class="ons-grid__col ons-col-auto ons-u-flex-shrink">
                <p class="ons-phase-banner__desc">
                    {#if phase == "Prototype"}
                    This is a protoype – to help improve it please <a href="{url}">give us your feedback</a>
                    {:else}
                    This is a new service – to help improve it please <a href="{url}">give us your feedback</a>
                    {/if}
                </p>
            </div>
        </div>
    </div>
</aside>

<style>
    .ons-phase-banner {
        background: #f5f5f6;
        padding: 0.5rem 0;
    }
    .ons-grid {
        box-sizing: border-box;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-flow: row wrap;
        margin-left: 0;
    }
    .ons-grid__col {
        width: auto;
        flex-basis: auto;
        max-width: 100%;
        padding-left: 0;
        -webkit-box-flex: 0;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .ons-phase-banner__badge {
        font-weight: 600;
        display: block;
        background: #222;
        color: #fff;
        font-size: 15.3px;
        line-height: 1em;
        margin: 0 0.5rem 0 0 !important;
        padding: 0.4rem;
        text-transform: uppercase;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .ons-phase-banner__desc {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.4;
        padding: 0;
        margin: 0 0 1rem;
        margin-bottom: 0 !important;
        margin-top: 0.3rem;
    }
    .ons-phase-banner__desc a {
        text-decoration: underline 1px solid;
        text-underline-position: under;
    }
    .ons-phase-banner__desc a:hover {
        text-decoration-thickness: 2px;
    }
</style>