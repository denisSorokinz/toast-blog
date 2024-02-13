user stories:
~ homepage
    view (logged in / not logged in)
~ blog
    view not logged in -> please log in
    view logged in -> display posts (if has permissions)
~ admin
    login
    CRUD posts (title, content, created_at)
    CRUD users (login, password, permissions, created_at)

testing potential:
~ back-end:
    using knex (migrations+seeds(non-existent/empty/populated))
    (w/ valid/invalid/permitted/non-permitted tokens):
        test posts CRUD 
        test users CRUD
~ front-end:
    using Cypress test all user stories:
        homepage view -> static content
        blog unauthorized view -> form fill in -> content
        blog authorized view -> content
        admin unauthorized view -> form fill in -> content
        admin authorized view -> content
        posts CRUD: admin interface & blog content updates
        users CRUD: able/unable to log in as a created/deleted user
~ CI/CD

plan:
+ create back-end:
    posts
        ✅getAllPosts()
        ✅getPostById()
    users
        ✅signUp()
        ✅login()
    ✅test endpoints
~ create front-end
    ✅init project
    ✅homepage
        Welcome to Toast Blog!
        See posts at Posts Page
    blog
        ✅show all posts
        ✅unauthorized single post view -> login modal
            algorithm:
             user clicks on a single post
             modal is shown
             form is filled in
             user redirected to /blog/:id
            info:
             no route change on click
             data structures:
              modal - zustand store (isActive)
              auth - zustand store (user, accessToken)
            steps:
             + implement auth store
             + implement modal state
             + implement modal view: form UI
             + implement form submission onSuccess (auth update + redirect)
        ✅ single post page
            + implement cookie-based auth (/api/ route handlers + graphql { mutation login } on server + cookies.set())
            + server-side authorization - verify on server user has permissions.read:posts
    admin
        + unauthorized view + login modal
        + make migration compatible w/ permissions format: {'str1', 'str2'}
        + authorized view ->
            + sidebar
            + learn parallel routes
            + posts view (use parallel routes)
            + users view (use parallel routes)
            + refactor DashboardLayout to use page.tsx for MainView rendering logic
            > develop PostsView
                + list all posts as cards
                > post 'edit'
                    card onClick -> flip post card, display input fields for: title, content, createdAt
                        'edit' UX/UI?
                        input for each field (date picker for createdAt) (pos absolute tooltip)
                        react-hook-form & zod
                        server action & debounce
                        steps:
                            + create EditPost component
                            + create zod validation schema for posts (title 5+ chars, content 20+ chars, created at optional, default to Date.now())
                            > implement shadcn calendar
                            prevent card flip on input click
                            create form, display input fields for title & content
                            display date picker for createdAt
                            onFieldChange() && zodValid -> editPostServerAction(formData)
                            debounce each onFieldChange()
                extend tailwind for FlipBox css
                display 'delete' button
                display '+ create' button in the top right corner of the view
            ~ integrate PostsView to /dashboard/view
            ~ integrate PostsView to /dashboard
            ~ develop UsersView
            ~ integrate UsersView to /dashboard/view
            ~ integrate UsersView to /dashboard

---
task: use ShadCn components for a11y - Card, Form, etc.
---
task: create authentication

steps:
+ SignUp mutation (login / password):
    create a mutation
    if user exists -> return
    create user in DB w/ read:posts permissions
    sign token w/ payload { login, permissions ['read:posts'] }
    return token

> Login mutation (login / password)
---

---
task: create 2 migrations for 'users' table
---

---
task: use seeds to populate DB w/ initial data
---

---
task: cover API w/ tests
---
