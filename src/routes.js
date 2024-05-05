import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from './containers/home'
import Login from './containers/auth/Login'
import Register from './containers/auth/Register'
import Dashboard from './containers/dashboard'
import DashboardHome from './containers/dashboard/DashboardHome'
import NotFound from './components/NotFound';
import Logout from './containers/auth/Logout';
import Auth from './containers/auth/index'
import WorkspaceIntro from './containers/workspace/intro'
import Workspace from './containers/workspace'
import AddWorkspace from './containers/workspace/add/index'
import WorkspaceList from './containers/workspace/WorkspaceList'
import SelectDesk from './containers/workspace/add/desk'
import SelectPackage from './containers/workspace/add/package'

import EventMeeting from './containers/events'
import EventIntro from './containers/events/intro'
import SelectMeetingRoom from './containers/events/meeting/add/SelectMeetingRoom'
import MeetingDetailForm from './containers/events/meeting/add/MeetingDetailForm';


export const routes = [
    {
        path: '/dashboard',
        title: 'blueSpace - Dashboard',
        name: 'Dashboard',
        // exact: true,
        component: Dashboard,
        private: true,
    },
    {
        path: '/auth',
        title: 'blueSpace - Login',
        // exact: true,
        name: 'Login',
        component: Auth,
    },
    {
        path: '/',
        title: 'blueSpace - where work meets life',
        name: 'Home',
        // exact: true,
        component: Home,
        redirect: '/dashboard'
    },
    {
        path: '/:anything',
        title: '404- Not Found',
        name: 'Not Found',
        component: NotFound
    }
]

export const homeRoutes = [
    {
        path: '/',
        title: 'blueSpace - where work meets life',
        name: 'Home',
        exact: true,
        component: () => <Redirect to='/dashboard' />,
    },
    {
        path: '/:anything',
        title: '404- Not Found',
        name: 'Not Found',
        component: NotFound
    }
]

export const authRoutes = [
    {
        path: '/auth/login',
        title: 'blueSpace - Login',
        exact: true,
        name: 'Login',
        component: Login,
    },
    {
        path: '/auth/register',
        exact: true,
        name: 'Register',
        title: 'blueSpace - Register',
        component: Register
    },
    {
        path: '/auth/logout',
        exact: true,
        name: 'Logout',
        title: 'blueSpace - Logout',
        component: Logout
    },
]

export const dashboardRoutes = [
    {
        path: '/dashboard',
        exact: true,
        name: 'Workspace',
        // private: true,
        title: 'blueSpace - Workspace',
        component: DashboardHome,
    },
    {
        path: '/dashboard/workspace',
        // exact: true,
        name: 'Workspace',
        private: true,
        title: 'blueSpace - Workspace',
        component: Workspace,
        // routes: 
    },
    {
        path: '/dashboard/event-meeting',
        private: true,
        // exact: true,
        name: 'Events and Meetings',
        title: 'blueSpace - Events and meetings',
        component: EventMeeting,
    },
]

export const meetingRoutes = [
    {
        path: '/dashboard/event-meeting',
        private: true,
        exact: true,
        name: 'Events and Meetings',
        title: 'blueSpace - Events and meetings',
        component: EventIntro,
    },
    {
        path: '/dashboard/event-meeting/meeting/add',
        private: true,
        exact: true,
        name: 'Events and Meetings',
        title: 'blueSpace - Select Meeting Room - Events and meetings',
        component: SelectMeetingRoom
    },
    {
        path: '/dashboard/event-meeting/meeting/add/detail',
        private: true,
        exact: true,
        name: 'Events and Meetings',
        title: 'blueSpace - Meeting detail form - Events and meetings',
        component: MeetingDetailForm
    }
]

export const workspaceRoutes = [
    {
        path: '/dashboard/workspace',
        exact: true,
        name: 'Workspace',
        private: true,
        title: 'blueSpace - Workspace',
        component: WorkspaceIntro,
        // routes: 
    },
    {
        path: '/dashboard/workspace/list',
        exact: true,
        name: 'Workspace',
        private: true,
        title: 'blueSpace - Workspace list',
        component: WorkspaceList
    },
    {
        path: '/dashboard/workspace/add',
        private: true,
        exact: true,
        name: 'Add Workspace',
        title: 'blueSpace - Book Workspace',
        component: AddWorkspace
    },
    {
        path: '/dashboard/workspace/add/desk',
        private: true,
        exact: true,
        name: 'Add Workspace',
        title: 'blueSpace - Select Desk type - Book Workspace',
        component: SelectDesk
    },
    {
        path: '/dashboard/workspace/add/package',
        private: true,
        exact: true,
        name: 'Add Workspace',
        title: 'blueSpace - Select package type - Book Workspace',
        component: SelectPackage
    },
]