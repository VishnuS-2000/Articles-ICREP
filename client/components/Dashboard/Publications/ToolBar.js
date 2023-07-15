const toolbarOptions = {
    container: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      [{ table: 'better-table' }], // specify the better-table module
      ['clean'],
    ],
    table: {
      operationMenu: {
        items: {
          unmergeCells: {
            text: 'Split',
            icon: {
              name: 'unmergeCells',
              options: {
                width: 14,
                height: 14,
              },
            },
          },
        },
      },
    },
  };
  