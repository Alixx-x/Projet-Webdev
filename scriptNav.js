<script>
        function includeHTML(){
            document.querySelectorAll('[data-include]').forEach(async (el) => {
                const file = el.getAttribute('data-include');
                const response = await fetch(file);
                if (response.ok) {
                    el.innerHTML = await response.text();
                } else {
                    console.error(`Error loading ${file}`);
                }
            })
        }
        document.addEventListener('DOMContentLoaded', includeHTML);
</script>