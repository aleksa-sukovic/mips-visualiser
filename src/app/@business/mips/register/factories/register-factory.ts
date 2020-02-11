import { Register } from '../models/register';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class RegisterFactory
{
    protected static encoder = new BinaryEncoder();

    public static fromSpecification (specification: any): Register
    {
        return new Register(
            specification.aliases,
            specification.id,
            RegisterFactory.encoder.binary(specification.value, specification.word_length),
            specification.editable,
            specification.visible,
        );
    }
}
