"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { signOut } from "next-auth/react"
import { SideBarProps } from "@/interfaces/hompageInterface";

export const SideBar = ({name, username, image}: SideBarProps) => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        //Close sidebar when clicking outside
        const clickOutsideHandler = (event: MouseEvent) => {
            if(sidebarRef.current && profileRef.current && !sidebarRef.current.contains(event.target as Node) && !profileRef.current.contains(event.target as Node)){
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [])

    useEffect(() => {
        //Close sidebar on escape key
        const escapeKeyHandler = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                setOpen(false)
            }
        }
        document.addEventListener("keydown", escapeKeyHandler)
        return () => {
            document.removeEventListener("keydown", escapeKeyHandler)
        }
    }, [])

    const sidebarToggler = () => {
        setOpen(!isOpen)
    }

    const closeSidebar = () => {
        setOpen(false)
    }

    //Close sidebar before logging out
    const logoutHandler = () => {
        signOut({ callbackUrl: "/" })
        setOpen(false) 
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            sidebarToggler();
        }
    };

  return (
    <div className="relative">
        <div ref={profileRef} className="rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-white/30 transition-all duration-200" onClick={sidebarToggler} role="button" tabIndex={0} onKeyDown={keyDownHandler}
        aria-label="Open profile menu">
            <Image src={image} alt="profile" width={50} height={50} className="rounded-full"/>
        </div>
        {isOpen && (
            <>
            <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={closeSidebar} />
            <div ref={sidebarRef} className="absolute right-0 top-16 w-72 bg-white rounded-lg shadow-xl border border-gray-200 pt-4 pb-0 px-0 z-50 transform transition-all duration-200 ease-out" role="menu" aria-orientation="vertical">
                <div className="px-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <Image src={image} alt="profile" width={48} height={48} className="rounded-full" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                            <p className="text-sm text-gray-500 truncate">@{username}</p>
                        </div>
                    </div>
                </div>
                <div className="py-2">
                    <Link href={username != 'To_Be_Onboarded'? `/profile/${username}` : "/onboarding"} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150" onClick={closeSidebar} role="menuitem">
                        <PersonIcon className="mr-2"/>
                        View your profile
                    </Link>
                    <Link href={username != 'To_Be_Onboarded'? `/profile/${username}/edit` : "/onboarding"} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150" onClick={closeSidebar} role="menuitem">
                        <EditIcon className="mr-2"/>
                        Edit your Profile
                    </Link>
                    <button onClick={logoutHandler} className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 text-left cursor-pointer" role="menuitem">
                        <LogoutIcon className="mr-2"/>
                        Logout
                    </button>
                </div>
            </div>
            </>
        )}
    </div>
    )
}
