<script>
import Tags from '../components/core/Tags.svelte'

// If on:tags is defined
let tag = "";

function handleTags(event) {
    tag = event.detail.tags;
}

const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina"
];
</script>

<div class="w-full max-w-sm p-2 mb-6 border shadow-xl">
    <Tags
        on:tags={handleTags}
        maxTags={10}
        allowPaste={true}
        allowDrop={true}
        splitWith={"/"}
        onlyUnique={true}
        removeKeys={[27]}
        placeholder={"Svelte Tags Input full example"}
        autoComplete={countryList}
        name={"custom-name"}
        id={"custom-id"}
        allowBlur={true}
        disable={false}
        minChars={1}
    />

    Tags: {tag}
</div>