const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'ts':
      case 'tsx':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="h-4 w-4" />;
      case 'js':
      case 'jsx':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="h-4 w-4" />;
      case 'py':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="h-4 w-4" />;
      case 'java':
      case 'class':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="h-4 w-4" />;
      case 'cpp':
      case 'c':
      case 'h':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" className="h-4 w-4" />;
      case 'zip':
      case 'rar':
      case 'tar':
      case 'gz':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
      case 'mp3':
      case 'wav':
      case 'ogg':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
      case 'csv':
      case 'xlsx':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
      case 'txt':
      case 'md':
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
      default:
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg" className="h-4 w-4" />;
    }
  };

export default getFileIcon;