import "./uploadProfileFile.scss"
import word from "../../assets/icons8-microsoft-word-2019-240.png"
import exel from "../../assets/icons8-microsoft-excel-2019-240.png"
import pdf from "../../assets/icons8-pdf-96 (1).png"
import file from "../../assets/icons8-document-240.png"
import { FC } from "react";

interface UploadFileProps {
  title?: string;
  type: any;
}

const UploadProfileFile: FC<UploadFileProps> = ({
  title,
  type,
}) => {

  const icon = type === 'word' ? word : type === 'exel' ? exel : type === 'pdf' ? pdf : file

  return (
    <div className="upload-file-conteiner" >
      <div className="img-conteiner">
        <img src={icon} alt="" />
      </div>
      <div className="file-description">
        {title}
      </div>
    </div>
  )
}

export default UploadProfileFile