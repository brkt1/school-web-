// import { AuthUser } from "@/store/slices/userItem";
// import { getUser } from "@/store/slices/userSlices";
// import { appURL } from "@/utils/api/api";
// import { useGoogleOneTapLogin } from "@react-oauth/google";
// import { useRouter } from "@/navigation";
// import useUserService from "@/hooks/userService";
// import { useDispatch } from "react-redux";
// import { setLanguage } from "@/store/slices/languageSlices";

// const GoogleOneTap = () => {
//     const userService = useUserService()
//     const router = useRouter();
//     const dispatch = useDispatch();

//     const addToken = (value: AuthUser) => {
//         localStorage.setItem(
//             `${appURL}.token.authorizationData`,
//             value.access_token
//         );
//         localStorage.setItem(
//             `${appURL}.refresh.authorizationData`,
//             value.refresh_token
//         );
//         dispatch(getUser({
//             ...value.user, phone_number: value.user.phone_number as string
//         }));
//         if (value.user.language) {
//                             dispatch(setLanguage(value.user.language))
//                           }
//         router.push("/", { locale: value.user.language.code });
//     };

//     useGoogleOneTapLogin({
//         // auto_select: true,
//         cancel_on_tap_outside: false,
//         use_fedcm_for_prompt: true,
//         onSuccess: response => {
//             response.credential && userService.google_onetap(response.credential)
//                 .then(({ data: value }) => {
//                     if (value.refresh_token) {
//                         addToken(value);
//                         localStorage.setItem(
//                             `${appURL}.google.authorizationData`,
//                             response.credential!
//                         );
//                     }
//                 })
//                 .catch(error => {
//                     // Handle error
//                 });
//         },
//         onError: () => {
//             console.error('One Tap Sign-In Error');
//         }
//     });
//     return <></>
// }

// export default GoogleOneTap