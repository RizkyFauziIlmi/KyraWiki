import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export const CurrentPath = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  return (
    <>
      <Breadcrumb
        separator={">"}
        fontWeight={"bold"}
        opacity={0.5}
        fontSize={"lg"}
        p={2}
      >
        <BreadcrumbItem isCurrentPage={pathname === "/" ? true : false}>
          <Link to={"/"}>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink>{name}</BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={index}>
              <Link to={routeTo}>
                <BreadcrumbLink>{name}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};
