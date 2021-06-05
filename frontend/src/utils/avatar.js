/* global BigInt */
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export default id => {
  // console.log(`id`, id)
  // console.log(`parseInt(id, 16)`, parseInt(id, 16))
  // console.log(`parseInt(id, 16)%20`, parseInt(id, 16)%20)
  // console.log(`id.hashCode()`, id.hashCode())
  return `https://www.redditstatic.com/avatars/avatar_default_${String(id.hashCode()%20+1).padStart(2, "0")}_${
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
    ][id.hashCode()%25]
  }.png`
}