export enum PublicRoutes {
  HOME = '/',
  LOGIN = '/login',
  ONBOARDING = '/onboarding',
  REGISTER_CREATED_ACCOUNT = '/register/created-account',

  COMPANY_INFORMATION = '/register/company/company-information',
  COMPANY_CREDENTIALS = '/register/company/credentials',

  CANDIDATE_CHECK_MAIL = '/register/candidate/check-email',
  CANDIDATE_PERSONAL_INFORMATION = '/register/candidate/personal-information',
  CANDIDATE_SELF_DECLARATION = '/register/candidate/self-declaration',
  CANDIDATE_PROFESSIONAL_INFORMATION = '/register/candidate/professional-information',
  CANDIDATE_SOFT_SKILLS = '/register/candidate/soft-skills',
  CANDIDATE_HARD_SKILLS = '/register/candidate/hard-skills',
  CANDIDATE_CREATE_PASSWORD = '/register/candidate/create-password',
}

export enum PrivateRoutes {
  COMPANY = '/logged/company',
  JOBS = '/logged/jobs',
  JOB_REGISTER = '/logged/jobs/selective-process/register',
  PROCESS_DETAIL = '/logged/jobs/selective-process/detail',
  PEOPLES = '/logged/peoples',
}
