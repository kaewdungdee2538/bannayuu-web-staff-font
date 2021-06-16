export function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }
  
export function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
  }

