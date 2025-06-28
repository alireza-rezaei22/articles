import ArticleList from './pages/articles/articles'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Panel from './pages/panel/panel'
import ArticlePage from './pages/articlePage/articlePage'
import Profile from './pages/panel/Profile/Profile'
import NewAritcle from './pages/panel/NewAritcle/NewAritcle'
import Bookmarks from './pages/panel/Bookmarks/Bookmarks/Bookmarks'
import Likes from './pages/panel/Likes/Likes'

const routes =[
    {path: '/', element: <ArticleList/>},
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path: '/articlePage/:articleId', element: <ArticlePage/>},
    {path: '/panel/*', element: <Panel/>, children: [
        {path: 'Profile', element: <Profile/>},
        {path: 'NewAritcle', element: <NewAritcle/>},
        {path: 'bookmarks', element: <Bookmarks/>},
        {path: 'likes', element: <Likes/>}
    ]},
]
export default routes