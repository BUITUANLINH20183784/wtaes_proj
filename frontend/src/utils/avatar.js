export default id => 
  `https://www.redditstatic.com/avatars/avatar_default_${String(parseInt(id, 16)%20+1).padStart(2, "0")}_${
    [
      "A5A4A4",
      "545452",
      "A06A42",
      "C18D42",
      "FF4500",
      "FF8717",
      "FFB000",
      "FFD635",
      "DDBD37",
      "D4E815",
      "94E044",
      "46A508",
      "46D160",
      "0DD3BB",
      "25B79F",
      "008985",
      "24A0ED",
      "0079D3",
      "7193FF",
      "4856A3",
      "7E53C1",
      "FF66AC",
      "DB0064",
      "EA0027",
      "FF585B",
    ][parseInt(id, 16)%25]
  }.png`