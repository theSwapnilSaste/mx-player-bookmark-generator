let bookmarks = [];

function pad(num) {
  return num.toString().padStart(2, '0');
}

function validateTimeInput(id, max) {
  const input = document.getElementById(id);
  let value = parseInt(input.value) || 0;

  if (value < 0) value = 0;
  if (value > max) value = max;

  input.value = value;
}

function addBookmark() {
  validateTimeInput('hour', 23);
  validateTimeInput('minute', 59);
  validateTimeInput('second', 59);

  const hour = parseInt(document.getElementById('hour').value) || 0;
  const minute = parseInt(document.getElementById('minute').value) || 0;
  const second = parseInt(document.getElementById('second').value) || 0;
  const name = document.getElementById('bookmarkName').value.trim();

  const totalSeconds = hour * 3600 + minute * 60 + second;
  const timeString = `${pad(hour)}:${pad(minute)}:${pad(second)}`;

  if (name === "") {
    alert("Please enter bookmark name.");
    return;
  }

  bookmarks.push(`<bookmark name="${name} at ${timeString}" position="${totalSeconds}" />`);
  updateOutput();
  document.getElementById('bookmarkName').value = "";
}

function updateOutput() {
  const xmlContent = "<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>\n<bookmarks>\n" +
    bookmarks.join("\n") + "\n</bookmarks>";
  document.getElementById('output').value = xmlContent;
}

function copyXML() {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  alert("XML copied to clipboard.");
}

function saveXML() {
  const blob = new Blob([document.getElementById('output').value], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bookmarks.xml';
  a.click();
  URL.revokeObjectURL(url);
}

// Event Listeners with input validation on change
document.getElementById('addBookmarkBtn').addEventListener('click', addBookmark);
document.getElementById('copyBtn').addEventListener('click', copyXML);
document.getElementById('saveBtn').addEventListener('click', saveXML);

document.getElementById('hour').addEventListener('change', () => validateTimeInput('hour', 23));
document.getElementById('minute').addEventListener('change', () => validateTimeInput('minute', 59));
document.getElementById('second').addEventListener('change', () => validateTimeInput('
