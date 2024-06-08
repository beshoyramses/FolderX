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
        icon: ScheduleIcon,
        route: "/recent-files",
        label: "Recent files",
    },
    {
        icon: DeleteIcon,
        route: "/deleted-files",
        label: "deleted files",
    },
    {
        icon: StarRateIcon,
        route: "/stared-files",
        label: "Starred Files",
    }
    
]