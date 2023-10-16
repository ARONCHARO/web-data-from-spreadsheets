document.addEventListener("DOMContentLoaded", function() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/1t5aGi13FQhbbnMvbhEJ1hW40lIPMv3vqKIaZRpqRKO8/edit?usp=sharing";
    const table = $('#data-table').DataTable({
        paging: false // Disable paging for small datasets
    });

    // Search functionality
    $('#search').on('keyup', function() {
        table.search(this.value).draw();
    });

    fetch(sheetURL)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const rows = htmlDoc.querySelectorAll("table tr");

            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].querySelectorAll("td");
                const name = columns[0].textContent;
                const age = columns[1].textContent;

                table.row.add([name, age]).draw(); // Add data to DataTables
            }
        })
        .catch(error => console.error("Error fetching data: ", error));
});