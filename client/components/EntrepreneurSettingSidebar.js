import Link from 'next/link';
import { useRouter } from 'next/router';

export default function EntrepreneurSettingSidebar(){
    const router = useRouter();

    return(
        <ul className="list-unstyled">
        <Link href={"/entrepreneur/settings/user-profile"} passHref> 
            <li
            className={(router.pathname == "/entrepreneur/settings/user-profile")?"btn entrepreneurSidebarButton mb-2":"mb-2"} 
            role="button"
            // style={{
            //     backgroundColor: (router.pathname == "/settings/user-profile")?'#DAE4FF':'#cc3'
            // }}
            > User Profile</li>
        </Link>
        <Link href={"/entrepreneur/settings/change-password"} passHref> 
            <li
             className={(router.pathname == "/entrepreneur/settings/change-password")?"btn entrepreneurSidebarButton mb-2":"mb-2"} 
             role="button"> Change Password</li>
        </Link>
        <Link href={"/entrepreneur/settings/company-profile"} passHref> 
            <li
            className={(router.pathname == "/entrepreneur/settings/company-profile")?"btn entrepreneurSidebarButton mb-2":"mb-2"} 
            role="button"> Company Profile</li>
        </Link>
        <Link href={"/entrepreneur/settings/billing"} passHref> 
            <li
            className={(router.pathname == "/entrepreneur/settings/billing")?"btn entrepreneurSidebarButton mb-2":"mb-2"} 
            role="button"> Billing and Payment</li>
        </Link>
        <Link href={"/entrepreneur/settings/orders"} passHref> 
            <li
            className={(router.pathname == "/entrepreneur/settings/orders")?"btn entrepreneurSidebarButton mb-2":"mb-2"} 
            role="button"> Orders</li>
        </Link>
        
    </ul>
    )
}