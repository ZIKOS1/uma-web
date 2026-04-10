import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
	variant?: 'default' | 'outline' | 'ghost' | 'link';
	size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = 'default', size = 'default', children, ...props },
		ref,
	) => {
		return (
			<motion.button
				ref={ref}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className={cn(
					'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
					{
						'bg-blue-600 text-white hover:bg-blue-700':
							variant === 'default',
						'border border-slate-200 bg-white hover:bg-slate-100 text-slate-900':
							variant === 'outline',
						'hover:bg-slate-100 hover:text-slate-900 text-slate-600':
							variant === 'ghost',
						'text-blue-600 underline-offset-4 hover:underline':
							variant === 'link',
						'h-10 px-4 py-2': size === 'default',
						'h-9 rounded-md px-3': size === 'sm',
						'h-11 rounded-md px-8': size === 'lg',
						'h-10 w-10': size === 'icon',
					},
					className,
				)}
				{...props}>
				{children}
			</motion.button>
		);
	},
);
Button.displayName = 'Button';

export { Button };
