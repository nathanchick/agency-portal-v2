import GitHubRepositoryController from './GitHubRepositoryController'
import GitHubOAuthController from './GitHubOAuthController'

const Controllers = {
    GitHubRepositoryController: Object.assign(GitHubRepositoryController, GitHubRepositoryController),
    GitHubOAuthController: Object.assign(GitHubOAuthController, GitHubOAuthController),
}

export default Controllers