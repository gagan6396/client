// Declaration for importing MP4 files as URLs
declare module '*.mp4' {
  const src: string; // Represents the URL of the MP4 file
  export default src;
}

// Declaration for importing MP4 files with a ?url query
declare module '*.mp4?url' {
  const src: string; // Represents the URL of the MP4 file
  export default src;
}
