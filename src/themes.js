const themes = {
  // defaultt: {
  //   title_color: "000000",
  //   icon_color: "4c71f2",
  //   text_color: "434d58",
  //   bg_color: "2e3541",
  // },
  default: {
    title_color: "000",
    icon_color: "000",
    text_color: "000",
    bg_color: "fff",
    border_color: "e4e2e2",
    box_border_color: "e4e2e2",
    tag_1_color: "06b6d4",
    tag_2_color: "ec4899",
    tag_3_color: "eab308",
    chart_total_color: "000",
  },
  // algolia: {
  //   title_color: "000",
  //   icon_color: "000",
  //   text_color: "000",
  //   bg_color: "fff",
  //   border_color: "e4e2e2",
  // },
  transparent: {
    title_color: "fff",
    icon_color: "fff",
    text_color: "fff",
    bg_color: "ffffff00",
    tag_1_color: "06b6d4",
    tag_2_color: "ec4899",
    tag_3_color: "eab308",
    chart_total_color: "fff"
  },
  dark: {
    title_color: "fff",
    icon_color: "fff",
    text_color: "fff",
    bg_color: "151515",
    tag_1_color: "00d2ff",     // Electric Cyan (High Energy)
    tag_2_color: "9d50bb",     // Deep Violet (Premium/Rare)
    tag_3_color: "f00056",     // Crimson Rose (Action/Urgency)
    chart_total_color: "fff",
    box_border_color: "e4e2e2",
  },
  nord_bright: {
    title_color: "000",
    icon_color: "000",
    text_color: "000",
    bg_color: "eceef5",
    tag_1_color: "4361ee",     // Royal Electric Blue
    tag_2_color: "7209b7",     // Deep Grape
    tag_3_color: "f72585",     // Neon Raspberry
    chart_total_color: "000",
    box_border_color: "94a3b8",
  },
  nord_dark: {
    title_color: "fff",
    icon_color: "fff",
    text_color: "fff",
    bg_color: "2e3541",
    tag_1_color: "0369a1", // Ocean Blue
    tag_2_color: "0f766e", // Deep Teal
    tag_3_color: "4338ca", // Indigo Night
    chart_total_color: "fff",
  },


  radical: {
    title_color: "fff",
    // icon_color: "fe428e",
    icon_color: "fff",
    text_color: "fff",
    bg_color: "141321",
    border_color: "2a2845",
    box_border_color: "2a2845",
    tag_1_color: "fe428e",
    tag_2_color: "a9fef7",
    tag_3_color: "f8d847",
    chart_total_color: "fff",
  },

  monokai: {
    title_color: "fff",
    // icon_color: "f92672",
    icon_color: "fff",
    text_color: "fff",
    bg_color: "272822",
    border_color: "3e3d32",
    box_border_color: "3e3d32",
    tag_1_color: "f92672",
    tag_2_color: "a6e22e",
    tag_3_color: "66d9ef",
    chart_total_color: "fff",
  },

  gruvbox: {
    title_color: "fff",
    icon_color: "fe8019",
    text_color: "fff",
    bg_color: "282828",
    border_color: "3c3836",
    box_border_color: "3c3836",
    tag_1_color: "cc241d",
    tag_2_color: "98971a",
    tag_3_color: "d79921",
    chart_total_color: "fff",
  },

  solarized: {
    title_color: "000",
    icon_color: "268bd2",
    text_color: "000",
    bg_color: "fdf6e3",
    border_color: "eee8d5",
    box_border_color: "eee8d5",
    tag_1_color: "268bd2",
    tag_2_color: "d33682",
    tag_3_color: "859900",
    chart_total_color: "000",
  },

  solarized_dark: {
    title_color: "fff",
    icon_color: "fff",
    text_color: "fff",
    bg_color: "002b36",
    border_color: "073642",
    box_border_color: "073642",
    tag_1_color: "268bd2",
    tag_2_color: "d33682",
    tag_3_color: "859900",
    chart_total_color: "fff",
  },

  tokyonight: {
    title_color: "fff",
    icon_color: "7aa2f7",
    text_color: "fff",
    bg_color: "1a1b26",
    border_color: "24283b",
    box_border_color: "24283b",
    tag_1_color: "9d7cd8",
    tag_2_color: "7aa2f7",
    tag_3_color: "f7768e",
    chart_total_color: "fff",
  },

  vue: {
    title_color: "000",
    icon_color: "41b883",
    text_color: "000",
    bg_color: "ffffff",
    border_color: "dfe2e5",
    box_border_color: "dfe2e5",
    tag_1_color: "41b883",
    tag_2_color: "35495e",
    tag_3_color: "81c784",
    chart_total_color: "000",
  },

  zenburn: {
    title_color: "000",
    icon_color: "dfaf8f",
    text_color: "000",
    bg_color: "3f3f3f",
    border_color: "4f4f4f",
    box_border_color: "4f4f4f",
    tag_1_color: "cc9393",
    tag_2_color: "7f9f7f",
    tag_3_color: "f0dfaf",
    chart_total_color: "000",
  }
  // tokyonight: {
  //   title_color: "fff",
  //   icon_color: "bf91f3",
  //   text_color: "38bdae",
  //   bg_color: "1a1b27",
  // },
  // monokai: {
  //   title_color: "fff",
  //   icon_color: "e28905",
  //   text_color: "f1f1eb",
  //   bg_color: "272822",
  // },
  // vue: {
  //   title_color: "fff",
  //   icon_color: "41b883",
  //   text_color: "273849",
  //   bg_color: "fffefe",
  // },
  // algolia: {
  //   title_color: "fff",
  //   icon_color: "2DDE98",
  //   text_color: "FFFFFF",
  //   bg_color: "050F2C",
  // },
  // gotham: {
  //   title_color: "2aa889",
  //   icon_color: "599cab",
  //   text_color: "99d1ce",
  //   bg_color: "0c1014",
  // },
  // "midnight-purple": {
  //   title_color: "9745f5",
  //   icon_color: "9f4bff",
  //   text_color: "ffffff",
  //   bg_color: "000000",
  // },
  // calm: {
  //   title_color: "e07a5f",
  //   icon_color: "edae49",
  //   text_color: "ebcfb2",
  //   bg_color: "373f51",
  // },
  // "flag-india": {
  //   title_color: "ff8f1c",
  //   icon_color: "250E62",
  //   text_color: "509E2F",
  //   bg_color: "ffffff",
  // },
  // react: {
  //   title_color: "61dafb",
  //   icon_color: "61dafb",
  //   text_color: "ffffff",
  //   bg_color: "20232a",
  // },
  // ocean_dark: {
  //   title_color: "8957B2",
  //   icon_color: "FFFFFF",
  //   text_color: "92D534",
  //   bg_color: "151A28",
  // },
  // city_lights: {
  //   title_color: "5D8CB3",
  //   icon_color: "4798FF",
  //   text_color: "718CA1",
  //   bg_color: "1D252C",
  // },
  // github_dark: {
  //   title_color: "58A6FF",
  //   icon_color: "1F6FEB",
  //   text_color: "C3D1D9",
  //   bg_color: "0D1117",
  // },
  // discord_old_blurple: {
  //   title_color: "7289DA",
  //   icon_color: "7289DA",
  //   text_color: "FFFFFF",
  //   bg_color: "2C2F33",
  // },
  // aura_dark: {
  //   title_color: "ff7372",
  //   icon_color: "6cffd0",
  //   text_color: "dbdbdb",
  //   bg_color: "252334",
  // },
  // panda: {
  //   title_color: "19f9d899",
  //   icon_color: "19f9d899",
  //   text_color: "FF75B5",
  //   bg_color: "31353a",
  // },
};

export default themes;
