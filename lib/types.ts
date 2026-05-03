export interface Topic {
	id: string;
	label: string;
	color: string;
	created_at?: string;
}

export interface Post {
	id: string;

	// Content
	title: string;
	slug: string;
	content: string;

	// Optional fields
	excerpt?: string;
	cover_image?: string;

	// Relations
	topic_id?: string;
	topics?: Topic; // when you join via Supabase

	// Metadata
	read_time?: number;
	published?: boolean;
	featured?: boolean;

	// SEO
	meta_title?: string;
	meta_description?: string;

	// Timestamps
	created_at?: string;
	updated_at?: string;
	published_at?: string;
}
