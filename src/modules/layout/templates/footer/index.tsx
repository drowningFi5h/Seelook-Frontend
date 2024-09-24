import { Text, clx } from "@medusajs/ui";

import { getCategoriesList, getCollectionsList } from "@lib/data";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6);
  const { product_categories } = await getCategoriesList(0, 6);

  return (
    <footer className="border-t border-ui-border-base w-full bg-gray-50 py-10">
      <div className="content-container flex flex-col w-full">

        {/* Footer Links */}
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-10">
          {/* Store Name */}
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-base hover:text-ui-fg-base uppercase"
            >
              Seelook Store
            </LocalizedClientLink>
          </div>

          {/* Footer Sections */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {/* Categories Section */}
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-ui-fg-base">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null;
                    }

                    const children = c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null;

                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base"
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="ml-3">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-ui-fg-base"
                                  href={`/categories/${child.handle}`}
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Collections Section */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-ui-fg-base">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Us Section */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-ui-fg-base">Contact Us</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <a
                    href="https://wa.me/YOUR_NUMBER"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/YOUR_CHANNEL"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/YOUR_INSTAGRAM"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex w-full justify-between text-ui-fg-muted mt-6">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Seelook Store. All rights reserved.
          </Text>
          <div className="flex gap-4">
            {/* Add any additional footer links or social icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
