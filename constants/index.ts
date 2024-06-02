import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarRateIcon from '@mui/icons-material/StarRate';

export const SidebarLinks = [
    {
        icon: DashboardIcon,
        route: "/",
        label: "Dashboard",
      },
    {
        icon: FolderCopyIcon,
        route: "/folders",
        label: "Folders",
    },
    {
        icon: DeleteIcon,
        route: "/trash",
        label: "deleted folders",
    },
    {
        icon: ScheduleIcon,
        route: "/recent",
        label: "Recent files",
    },
    {
        icon: DeleteIcon,
        route: "/trash",
        label: "deleted folders",
    },
    {
        icon: StarRateIcon,
        route: "/starred",
        label: "Starred Files",
    }
    
]