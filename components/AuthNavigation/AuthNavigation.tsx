"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import TagsMenu from "../TagsMenu/TagsMenu";

const AuthNavigation = () => {
	const router = useRouter();
	const { user, isAuthenticated, clearisAuthenticated } = useAuthStore();
	const handleClickLogOut = async () => {
		await logout();
		clearisAuthenticated();
		router.push("/sign-in");
	};
	return (
		<ul className={css.authNav}>
			{!isAuthenticated ?
				<>
					<li className={css.navigationItem}>
						<Link href="/sign-in" className={css.navigationLink}>
							Login
						</Link>
					</li>

					<li className={css.navigationItem}>
						<Link href="/sign-up" className={css.navigationLink}>
							Sign up
						</Link>
					</li>
				</>
			:	<>
					<li className={css.navigationItem}>
						<TagsMenu />
					</li>
					<li className={css.navigationItem}>
						<Link href="/profile" className={css.navigationLink}>
							Profile
						</Link>
					</li>
					<li className={css.navigationItem}>
						<p className={css.userEmail}>{user?.email}</p>
						<button
							type="button"
							className={css.logoutButton}
							onClick={handleClickLogOut}>
							Log Out
						</button>
					</li>
				</>
			}
		</ul>
	);
};

export default AuthNavigation;
