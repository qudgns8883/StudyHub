/**
 * @fileoverview
 * 이 파일은 데이터베이스의 'studies', 'tags', 'study_tags',
 * 'study_participants' 테이블에 대한 TypeScript 인터페이스를 정의합니다.
 */

// -----------------------------------------------------
// Table: studies (스터디 테이블)
// -----------------------------------------------------

/**
 * 스터디의 기본 정보를 나타내는 인터페이스입니다.
 * 이 인터페이스의 필드는 데이터베이스 'studies' 테이블의 컬럼과 일치합니다.
 */
export interface Study {
  id: number;
  title: string;
  description: string; // SQL에서 NULL을 허용하므로 선택적 필드로 정의
  maxParticipants: number;
  currentParticipants: number;
  startDate: string; // DATE 타입은 일반적으로 문자열로 처리됩니다.
  duration: string;
  creatorId: number;
  createdAt: string; // DATETIME 타입은 일반적으로 문자열로 처리됩니다.
  tags: string; // 태그 배열 필드 추가
}

/**
 * 새로운 스터디를 생성할 때 사용되는 인터페이스입니다.
 * 데이터베이스가 자동으로 생성하는 'id', 'currentParticipants', 'createdAt' 필드는 제외됩니다.
 */
export type NewStudy = Omit<Study, "id" | "creatorId"| "currentParticipants" | "createdAt">;

// -----------------------------------------------------
// Table: tags (태그 테이블)
// -----------------------------------------------------

/**
 * 태그의 정보를 나타내는 인터페이스입니다.
 * 'tags' 테이블의 'id'와 'name' 컬럼에 해당합니다.
 */
export interface Tag {
  id: number;
  name: string;
}

// -----------------------------------------------------
// Table: study_tags (스터디-태그 연결 테이블)
// -----------------------------------------------------

/**
 * 스터디와 태그의 다대다 관계를 나타내는 조인 테이블 인터페이스입니다.
 */
export interface StudyTag {
  studyId: number;
  tagId: number;
}

// -----------------------------------------------------
// Table: study_participants (스터디-참여자 연결 테이블)
// -----------------------------------------------------

/**
 * 스터디 참여자의 정보를 나타내는 인터페이스입니다.
 * 'study_participants' 테이블의 연결 정보를 담습니다.
 */
export interface StudyParticipant {
  studyId: number;
  userId: number;
  joinedAt: string;
}
