// index.ts에도 정의해주는 이유
// 1) index.ts가 없을 경우
//    다른 파일에서 임포트 할 때 => import { Button } from '@/components/common/Button'; 이런식으로 불러오게 됨
// 2) index.ts가 있는 경우★
//    다른 파일에서 임포트 할 때 => import { Button } from "@/components/common"; 이런식으로 불러오게 됨
// 코드도 간결해지고 유지보수 용이함
// ★항상 새로운 공용컴포넌트 만들때 index.ts에도 정의 해줍시다!!!★

export { default as Button } from './Button'
