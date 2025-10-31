import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { getUser } from "@/store/slices/userSlices";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Permission } from "@/modules/auth/authorize/auth.enum";
import useAuthorizeService from "@/modules/auth/authorize/authorize.service";

const useAuthorization = () => {
	const user = useSelector((state: AppState) => state.user);
	const authService = useAuthorizeService()
	const dispatch = useDispatch()
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

	const router = useRouter();

	const isLoggedIn = (): boolean => {
		return user.username != null;
	};

	const isSysAdmin = (): boolean => {
		return user.is_superuser;
	};


	const requireSysAdmin = (): void => {
		if (!isSysAdmin()) {
			router?.back();
			// message.error("You are not system admin");
		}
	};

	const hasPermission = (uri: string, permission: Permission): boolean => {
		return (
			user.converted_user_permission &&
			user.converted_user_permission[uri] &&
			user.converted_user_permission[uri][permission]
		);
	};

	const canCreate = (uri: string): boolean => {
		if (isSysAdmin()) {
			return true;
		}
		return hasPermission(uri, Permission.CAN_CREATE);
	};

	const requireCreate = (uri: string): boolean => {
		if (!canCreate(uri)) {
			// router.back(); 
			// message.error("You cannot create");
			return false;
		}
		return true;
	};

	const canRead = (uri: string): boolean => {
		if (isSysAdmin()) {
			return true;
		}
		return hasPermission(uri, Permission.CAN_VIEW);
	};

	const requireRead = (uri: string): boolean => {
		if (!canRead(uri)) {
			// router.back(); 
			// message.error("You cannot read");
			return false;
		}
		return true;
	};

	const canUpdate = (uri: string): boolean => {
		if (isSysAdmin()) {
			return true;
		}
		return hasPermission(uri, Permission.CAN_CHANGE);
	};

	const otherAction = (uri: string): boolean => {
		if (isSysAdmin()) {
			return true;
		}
		return hasPermission(uri, Permission.OTHER_ACTION);
	};

	const authorizeUser = () => {
		if(user){
			setIsAuthenticated(true)
		}
		authService.authUser().then(user => {
			dispatch(getUser({
				...user.data,
				phone_number: user.data.phone_number as string
			}));
			setIsAuthenticated(true)
		}).catch(e => {
			setIsAuthenticated(false)
		})
	}

	const requireUpdate = (uri: string): boolean => {
		if (!canUpdate(uri)) {
			// router.back(); 
			// message.error("You cannot update");
			// this.tcNavigator.accessDenied();
			// this.dialogRef.closeAll();
			// this.tcNotification.error("You have not access to edit")
			return false;
		}
		return true;
	};

	const canDelete = (uri: string): boolean => {
		if (isSysAdmin()) {
			return true;
		}
		return hasPermission(uri, Permission.CAN_DELETE);
	};

	const requireDelete = (uri: string): boolean => {
		if (!canDelete(uri)) {
			// router.back(); 
			// message.error("You cannot delete");
			return false;
		}
		return true;
	};


	const requireLogin = () => {
		if(!isLoggedIn()){
			console.log("NOT LOGGED IN")
			authService.authUser().then((user) => {
					dispatch(getUser({
                        ...user.data,
						phone_number: user.data.phone_number as string
                    }));
			}).catch(e => {
				router.push('/login')
			})
		}
	}

	return {
		requireLogin,
		isLoggedIn,
		isSysAdmin,
		canCreate,
		requireCreate,
		canUpdate,
		requireUpdate,
		canRead,
		requireRead,
		canDelete,
		requireDelete,
		requireSysAdmin,
		otherAction,
		isAuthenticated,
		authorizeUser,
	};
};

export default useAuthorization;
