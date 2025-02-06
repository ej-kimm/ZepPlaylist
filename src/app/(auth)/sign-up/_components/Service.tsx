import checkBoxDefault from '@/assets/images/checkBoxDefault.svg'
import checkBoxSelected from '@/assets/images/checkBoxSelected.svg'
import Image from 'next/image'

type Props = {
  isChecked: boolean
  handleCheckboxChange: () => void
}

const Service = ({ isChecked, handleCheckboxChange }: Props) => {
  return (
    <div>
      <br />
      <h1>
        <b className="title-2 mt-[10px] text-[#4A4A4A]">제 1조(목적)</b>
      </h1>
      <br />
      <p className="caption-2 text-[#7D7D7D]">
        이 약관은 Zepplaylist가 제공하는 제반 서비스의 이용과 관련하여 회사와
        회원과의 권리, 의무 및, 책임사항, 기타 필요한 사항을 규정함을 목적으로
        합니다
      </p>
      <br />
      <h1>
        <b className="title-2 text-[#4A4A4A]">제 2조(정의)</b>
      </h1>
      <br />
      <p className="caption-2 text-[#7D7D7D]">
        이 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.
        <br />
        1. 서비스라 함은 구현되는 단맣기와 상관없이 이용자가 이용할 수 있는
        회사가 제공하는 제반 서비스를 의미합니다
        <br />
        2. 이용자란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원을 말합니다
      </p>
      <br />
      <h1>
        <b className="title-2 text-[#4A4A4A]">제 3조(약관 외 준칙)</b>
      </h1>
      <br />
      <p className="caption-2 text-[#7D7D7D]">
        이 약관에서 정하지 아니한 사항에 대해서는 법령 또는 회사가 정한 서비스
        약관, 운영정책 및 규칙 등의 규정을 따릅니다
      </p>
      <br />
      <h1>
        <b className="title-2 text-[#4A4A4A]">
          제 4조(회원정보의 관리 및 보호)
        </b>
      </h1>
      <br />
      <p className="caption-2 text-[#7D7D7D]">
        1. 회원의 아이디와 비빌번호에 관한 관리책임은 회원에게 있으며 이를 제
        3자가 이용하도록해서는 안됩니다
        <br />
        2. 회사는 회원의 아이디가 개인정보 유출 우려가 있거나 반사회적 또는
        공서양곡에 어긋나거나 회가 쪼는 서비스 운영자로 오인할 구려가 있는 경우,
        해당 아이디의 이용을 제한 할 수 있습니다
        <br />
        3. 회원은 아이디 및 비밀번호가 도용되거나 제 3자가 사용하고 있음을
        인지한 경우 이를 즉시 통지하고 안내에 따라야합니다 <br />
      </p>
      <br />
      <div className="flex items-center justify-center gap-2">
        <label>
          <Image
            src={isChecked ? checkBoxSelected : checkBoxDefault}
            width={16}
            height={16}
            alt="체크박스"
            className="h-4 w-4"
          />
          <input
            type="checkbox"
            className="mr-2 hidden h-5 w-5 cursor-auto rounded border-gray-300 accent-primary"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
        </label>
        <span className="caption-1">서비스 정책 이용약관 동의</span>
      </div>
    </div>
  )
}

export default Service
