import WebhookController from './WebhookController'
import PostMarkController from './PostMarkController'

const Controllers = {
    WebhookController: Object.assign(WebhookController, WebhookController),
    PostMarkController: Object.assign(PostMarkController, PostMarkController),
}

export default Controllers