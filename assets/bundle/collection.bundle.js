const genericData = {
  creator: {
    title: "Creator",
    containerClass: "contributor-card",
    children: [
      {
        tag: "div",
        class: "contributor-label",
        content: "Creator #{{index}}",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Creator Name",
        key: "name",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "YouTube Link",
        key: "link",
      },
    ],
  },

  contributor: {
    title: "Contributor",
    containerClass: "contributor-card",
    children: [
      {
        tag: "div",
        class: "contributor-label",
        content: "Contributor #{{index}}",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Contributor Name",
        key: "name",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "YouTube Link",
        key: "link",
      },
    ],
  },

  creditRole: {
    title: "Credit with Role",
    containerClass: "credit-card",
    children: [
      {
        tag: "input",
        type: "text",
        placeholder: "Name (e.g., JK Art)",
        key: "name",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Role (e.g., Lead Designer)",
        key: "role",
      },
      {
        tag: "textarea",
        placeholder: "Details (one per line)",
        key: "details",
      },
      {
        tag: "input",
        type: "checkbox",
        label: "Show Thanks Message",
        key: "thanksToggle",
        toggleTarget: "thanksMsg",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Thanks message",
        key: "thanksMsg",
        showOnToggle: "thanksToggle",
      },
    ],
  },
  videolink: {
    title: "Video Link",
    containerClass: "contributor-card",
    children: [
      {
        tag: "div",
        class: "contributor-label",
        content: "Video-Link #{{index}}",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Empty == Watch video",
        key: "videoName",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "YouTube Link",
        key: "link",
      },
    ],
  },
  downloadLink: {
    title: "Download Link",
    containerClass: "contributor-card",
    children: [
      {
        tag: "div",
        class: "contributor-label",
        content: "Download-Link #{{index}}",
      },
      {
        tag: "input",
        type: "text",
        placeholder: "Download link, Not be empty",
        key: "link",
      },
    ],
  },
  extraSection: {
    title: "Extra Section",
    containerClass: "contributor-card",
    children: [
      {
        tag: "input",
        type: "text",
        placeholder: "Section Title",
        key: "name",
      },
      {
        tag: "textarea",
        placeholder: "Details (one per line)",
        key: "details",
      },
      {
        tag: "input",
        type: "checkbox",
        label: "Add htmlContent",
        key: "includeHtmlToggle",
        toggleTarget: "includedHtml",
      },
      {
        tag: "textarea",
        placeholder: "Html content",
        key: "includedHtml",
        showOnToggle: "includeHtmlToggle",
      },
    ],
  },
};

const socialMedias = {
  insta: [ "https://instagram.com/yellowhostgaming"],
  yt: ["https://youtube.com/@yellowhostgaming","https://youtube.com/@khodiyarart88", "https://youtube.com/@nikhil0098"],
  gmail: [
    "yellowhostgaming1@gmail.com",
    "rohanpatel267774@gmail.com",
    "nikhilmadhavani09@gmail.com"
  ],
  whatsappGroup: [
    "https://chat.whatsapp.com/LbOJrGDWGuqLtygEZQU9uj",
    "https://chat.whatsapp.com/IwlLsyVFH4ILo1BAcLCZMr",
    "#"
  ]
};
