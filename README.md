# raycast-ones-extensions

Raycast extensions for [ones.ai](https://ones.ai).

## Support

- Search Content
    - Project
        - [x] project
        - [x] task
            - [x] record man-hour
        - [x] sprint
        - [x] resource
    - Wiki
        - [x] space
        - [x] page
        - [x] resource
- Manage Manhour
    - [x] query
    - [x] modify
    - [x] record
    - [x] delete

## Preferences

| Name | Required | Description | DefaultValue | 
| --- | --- | --- | --- |
| Base URL | true | Base URL for ONES API | https://ones.ai/project/api |
| Team UUID | true | Team UUID for ONES API | |
| User UUID | true | User UUID for ONES API | |
| Token | true | Token for ONES API | |
| Manhour Owner | false | Manhour owner name or uuid, set to ONES API - UserUUID while empty | |
| Manhour Days | false | Query Manhours in n days, default set to 7 | 7 |
| Manhour Task | false | UUID of the task where manhour record | |

## LICENSE

[MIT](./LICENSE)
