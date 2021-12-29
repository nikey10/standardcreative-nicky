import { ProjectInterface } from '@standardcreative/common/src/interfaces/ProjectInterface'

export const ProjectAction = {
  projectsFetched: (projectResult: ProjectInterface[]) => {
    return {
      type: 'PROJECTS_RETRIEVED' as const,
      projectResult: projectResult
    }
  },
  postProject: () => {
    return {
      type: 'PROJECT_POSTED' as const
    }
  }
}

export type ProjectActionType = ReturnType<typeof ProjectAction[keyof typeof ProjectAction]>
