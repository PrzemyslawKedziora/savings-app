<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Mail extends Mailable
{
    use Queueable, SerializesModels;

    public $messageContent;
    public $messageTitle;
    public $senderEmail;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($messageTitle,$messageContent,$senderEmail)
    {
        $this->messageTitle = $messageTitle;
        $this->messageContent = $messageContent;
        $this->senderEmail = $senderEmail;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            from: new Address('yourSavings@support.com','YourSavings'),
            subject: 'YourSavings email - '.$this->messageTitle
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'support-mail'
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
