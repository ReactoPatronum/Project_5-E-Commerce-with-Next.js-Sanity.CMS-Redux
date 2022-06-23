export default {
    name: "comment",
    type: "document",
    title: "Comment",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
      },
      {
        name: "approved",
        title: "Onayla",
        type: "boolean",
        description: "Yorumu yayınla",
      },
      {
        name: "email",
        title:"E-Mail",
        type: "string",
      },
      {
        name: "comment",
        title:"Comment",
        type: "text",
      },
      {
        name: "product",
        type: "reference",
        to: [{ type: "product" }],
      },
      {
        name:"rating",
        title:"Yıldız",
        type:"number"
      }
    ],
    orderings: [
      {
        title: 'Comment',
        name: 'comment',
        by: [
          {field: 'comment', direction: 'desc'}
        ]
      },
    ]
  };