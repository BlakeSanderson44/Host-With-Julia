import { ComponentPropsWithoutRef } from 'react';

type SectionProps = ComponentPropsWithoutRef<'section'>;

export default function Section({ className, children, ...rest }: SectionProps) {
  return (
    <section className={className} {...rest}>
      {children}
    </section>
  );
}
