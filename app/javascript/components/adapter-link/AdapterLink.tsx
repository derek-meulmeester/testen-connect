import React from "react";
import { Link } from "react-router-dom";

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

interface Props {
  url: string;
  external?: boolean;
  children?: React.ReactNode;
}

/**
 * react-router only supports links to pages it can handle itself. It does not
 * support arbitrary links, so anything that is not a path-based link should
 * use a regular old `a` tag
 */
export default function AdapterLink({
  children = null,
  url = "",
  external,
  ...rest
}: Props) {
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    const options: React.AnchorHTMLAttributes<any> = { ...rest };
    options.target = "_blank";
    options.rel = "noopener noreferrer";
    return (
      <a href={url} {...options}>
        {children}
      </a>
    );
  }

  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
}
